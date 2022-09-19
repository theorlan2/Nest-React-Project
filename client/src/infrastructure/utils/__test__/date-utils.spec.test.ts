import { formatDateIsYesterday } from "../dateUtils"
let time: string;
let timeYesterday: string;

describe("check method formatDateIsYesterday", () => {

    beforeEach(() => {
        time = "2022-09-15T00:40:55.000Z";
        timeYesterday = "2022-09-14T10:40:55.000Z";
    })

    it("is time param clean", () => {
        expect(formatDateIsYesterday('')).toBe("Invalid Date")
    });

    it("Have time param clean and specificDate set date", () => {
        expect(formatDateIsYesterday("", time)).toBe("Invalid Date")
    });

    it("check is yesterday", () => {
        expect(formatDateIsYesterday(timeYesterday, time)).toBe("Yesterday")
    });

})