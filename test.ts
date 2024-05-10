import {handler} from "./index";

const test = async () => {
    const response = await handler({} as any);
    console.log(response);
}

test();