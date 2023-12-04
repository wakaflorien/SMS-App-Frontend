export async function GET(req, res) {
    return new Response(JSON.stringify({
        message: "Welcome to infotext"
    }), {
        status: 200, statusText: "success"
    })
}