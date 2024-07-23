import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL_LOCAL;

    export const getLoggedInUser = async (id) => {
        const response = await axios.get(
            `${url}/users/${id}`,
        );
        return response.data.result;
    };