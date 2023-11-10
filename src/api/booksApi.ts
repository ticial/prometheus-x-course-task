import { Book } from "../types/book";
import { CartItem } from "../types/cartItem";
import { books_data } from "./books_data";

export enum PRICE_FILTER_OPTIONS {
    ANY,
    LT_15,
    BTW_15_30,
    GT_30,
}

export enum LEVEL_FILTER_OPTIONS {
    ANY,
    BEGINNER,
    MIDDLE,
    PRO,
}

const BOOKS_STORAGE_KEY = "books";

function getBooks() {
    let storageItem = localStorage.getItem(BOOKS_STORAGE_KEY);
    if (!storageItem) {
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books_data));
        return books_data;
    }
    try {
        return JSON.parse(storageItem);
    } catch (error) {
        console.log(error);
    }
}

function filterByPrice(book: Book, filter: PRICE_FILTER_OPTIONS) {
    switch (filter) {
        case PRICE_FILTER_OPTIONS.LT_15:
            return book.price < 15;
        case PRICE_FILTER_OPTIONS.BTW_15_30:
            return book.price >= 15 && book.price < 30;
        case PRICE_FILTER_OPTIONS.GT_30:
            return book.price >= 30;
        default:
            return true;
    }
}

function filterByLevel(book: Book, filter: LEVEL_FILTER_OPTIONS) {
    switch (filter) {
        case LEVEL_FILTER_OPTIONS.BEGINNER:
            return book.level === "Beginner";
        case LEVEL_FILTER_OPTIONS.MIDDLE:
            return book.level === "Middle";
        case LEVEL_FILTER_OPTIONS.PRO:
            return book.level === "Pro";
        default:
            return true;
    }
}

const books: Book[] = getBooks();

export const fakeBooksApi = {
    async fetchBooks(
        query = "",
        priceFilter = PRICE_FILTER_OPTIONS.ANY,
        levelFilter = LEVEL_FILTER_OPTIONS.ANY,
        offset = 0,
        limit = 30
    ) {
        await new Promise((r) => setTimeout(r, 500)); // fake delay
        let results: Book[] = [];
        const regex = new RegExp(query, "i");
        for (
            let src_i = (offset = 0);
            src_i < books.length && results.length !== limit;
            src_i++
        ) {
            const book = books[src_i];

            if (
                filterByLevel(book, levelFilter) &&
                filterByPrice(book, priceFilter) &&
                (query === "" ||
                    regex.test(book.author) ||
                    regex.test(book.title) ||
                    book.tags.includes(query))
            ) {
                results.push(book);
            }
        }
        return results;
    },
    async fetchBookById(id: number) {
        await new Promise((r) => setTimeout(r, 500)); // fake delay
        return books.find((book) => book.id === id);
    },
    async purchase(items: CartItem[]) {
        await new Promise((r) => setTimeout(r, 500)); // fake delay
        items.forEach((item) => {
            const book = books.find((book) => book.id === item.book.id);
            if (book) {
                book.amount -= item.amount;
                if (book.amount < 0) {
                    throw new Error(
                        "Invalid value: book.amount cannot be less than 0"
                    );
                }
            }
        });
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
    },
};