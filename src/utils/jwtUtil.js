import jwt_decode from 'jwt-decode';
export function isTokenExpired(token) {
    try {
        const decoded = jwt_decode(token);
        console.log(decoded);
        if (decoded.exp === undefined) {
            console.error("トークンにexpが含まれていません");
            return true; // expがない場合はトークンが無効とみなす
        }
        const currentTime = Date.now() / 1000; // 現在の時間を秒単位で取得
        return decoded.exp < currentTime; // expが現在の時間よりも小さい場合は期限切れ
    }
    catch (error) {
        console.error("トークンの解析に失敗しました:", error);
        return true; // エラーが発生した場合も期限切れとみなす
    }
}
//# sourceMappingURL=jwtUtil.js.map