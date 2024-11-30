import {AxiosResponse} from "axios";
import {getRequestForGoogleBooks} from "@/api/apiInterface";

export interface  BookInfo {
    title: string,
    subTitle: string,
    authors: string[],
    publisher: string,
    imageLinks: object
}

interface VolumeInfo {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    imageLinks: object
}

interface Item {
    volumeInfo: VolumeInfo;
}

/**
 * google books apiへ取得しに行く。見つからない場合null
 * @param bookTitle
 */
export async function getBookInfo(bookTitle: string): Promise<BookInfo | null> {
    const response: AxiosResponse = await getRequestForGoogleBooks(bookTitle)
    const items:Item[] = response.data.items
    const info = items.find((item: Item) => item.volumeInfo.title === bookTitle)?.volumeInfo ?? null;

//     TODO エラーハンドリング
    const bookInfo:BookInfo | null = info ? {
        title: bookTitle,
        subTitle: info.subtitle,
        authors: info.authors,
        publisher: info.publisher,
        imageLinks: info.imageLinks
    } : null

    return bookInfo
}