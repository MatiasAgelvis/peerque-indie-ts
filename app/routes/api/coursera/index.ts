import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  console.log(request);
  return request;
}

export async function action({ request }: ActionArgs) {
  console.log(request);
  return request;
}
