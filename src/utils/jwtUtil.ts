import {jwtDecode} from 'jwt-decode';

export function isTokenExpired(token: string): boolean {
    try {
        const decoded = jwtDecode(token)

        if (!decoded.exp) {
            console.error("トークンにexpが含まれていません");
            return true;
        }

        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error("トークンの解析に失敗しました:", error);
        return true; // エラーが発生した場合も期限切れとみなす
    }
}

