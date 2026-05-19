import { Button } from "@base-ui/react";
import { auth, signOut } from "../auth";
import ROUTES from "@/constants/routes";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="px-10 pt-[100px]">
      <h1 className={`text-3xl font-bold text-dark200_light800`}>
        Welcome to the Home Page
      </h1>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGNIN });
        }}
      >
        <Button type="submit">LogOut</Button>
      </form>
    </div>
  );
}
