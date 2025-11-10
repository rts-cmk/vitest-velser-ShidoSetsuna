//TESTTTTTTTTTTTTTTTTTTTTTTTS
//AGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  beforeAll,
  afterAll,
} from "vitest";
import { render } from "@testing-library/react";
import App, { inputType, myPromise, onlyNumbers, fetchUserData } from "./App";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// Set up MSW server
const server = setupServer();

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());

describe("App Component", () => {
  describe("Rendering", () => {
    it("renders Hello, Vitest! heading", () => {
      const { container } = render(<App />);
      const heading = container.querySelector("h1");
      expect(heading).toBeTruthy();
      expect(heading.textContent).toBe("Hello, Vitest!");
    });
  });
});

describe("inputType function", () => {
  let testValue;

  beforeEach(() => {
    testValue = null; // Reset testValue before each test
    console.log("Starting a new test with fresh state.");
  });

  afterEach(() => {
    testValue = null; // Clean up after each test
    console.log("Test completed. State cleaned up.");
  });

  describe("string inputs", () => {
    it('should return "string" if input is a string', () => {
      testValue = "just a regular string";
      expect(inputType(testValue)).toBe("string");
    });
  });

  it('should return "string" if input contains both letters and numbers', () => {
    testValue = "abc123";
    expect(inputType(testValue)).toBe("string");
  });

  describe("number inputs", () => {
    it('should return "number" if input is a number', () => {
      testValue = 42;
      expect(inputType(testValue)).toBe("number");
    });

    it('should return "number" if input is a numeric string', () => {
      testValue = "  456  ";
      expect(inputType(testValue)).toBe("number");
    });
  });

  describe("unknown inputs", () => {
    //The excercise said that the function should handle numbers and strings aswell as unknown types.
    //So im guessing that means arrays and objects should be considered unknown types.
    //Since it wasnt specified it should handle those types.
    it('should return "unknown" if input is null', () => {
      testValue = null;
      expect(inputType(testValue)).toBe("unknown");
    });

    it('should return "unknown" if input is an array', () => {
      testValue = [];
      expect(inputType(testValue)).toBe("unknown");
    });

    it('should return "unknown" if input is an object', () => {
      testValue = {};
      expect(inputType(testValue)).toBe("unknown");
    });
  });
});

describe("myPromise function", () => {
  it("should resolve when shouldResolve is true", async () => {
    await expect(myPromise(true)).resolves.toBe("Promise resolved");
  });

  it("should reject when shouldResolve is false", async () => {
    await expect(myPromise(false)).rejects.toBe("Promise rejected");
  });
});

describe("onlyNumbers function", () => {
  describe("when input is a number", () => {
    it("should return the number when the input is a number", () => {
      expect(onlyNumbers(242)).toBe(242);
    });
  });

  describe("when input is not a number", () => {
    it("should throw an error when the input is not a number", () => {
      expect(() => onlyNumbers("not a number")).toThrow(
        "Input must be a number"
      );
    });
  });
});

describe("fetchUserData function", () => {
  let userId;
  let mockedUserData;
  afterEach(() => {
    vi.restoreAllMocks(); // Clean up mocks after each test
    userId = undefined;
  });

  describe("when fetch is successful", () => {
    it("should fetch user data for a valid userId", async () => {
      userId = 1;
      mockedUserData = {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
      };

      // Mock the global fetch function
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockedUserData),
        })
      );

      const result = await fetchUserData(userId);

      expect(result).toEqual(mockedUserData);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should fetch user data using MSW", async () => {
      userId = 2;
      mockedUserData = {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        //Why is the email so different from the name? Who knows. Maybe its a secret code?
      };

      server.use(
        http.get(`https://jsonplaceholder.typicode.com/users/${userId}`, () => {
          return HttpResponse.json(mockedUserData);
        })
      );

      const result = await fetchUserData(userId);

      expect(result).toEqual(mockedUserData);
    });
  });

  describe("when fetch fails", () => {
    it("should throw error when response is not ok", async () => {
      userId = 9999;

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
        })
      );

      await expect(fetchUserData(userId)).rejects.toThrow(
        "Network response was no gud owo"
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should fail to fetch user data using MSW", async () => {
      userId = 9999;
      mockedUserData = {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
      };

      server.use(
        http.get(`https://jsonplaceholder.typicode.com/users/${userId}`, () => {
          return HttpResponse.json(mockedUserData);
        })
      );

      await expect(fetchUserData(userId)).rejects.toThrow(
        "Network response was no gud owo"
      );
    });
  });
});
