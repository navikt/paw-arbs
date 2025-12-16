import { FC } from "hono/jsx";
import BaseLayout from "../layouts/BaseLayout.tsx";
import Header from "../layouts/Header.tsx";

const Error: FC<{ message: string }> = ({ message }) => {
  return (
    <BaseLayout title="Feilmelding">
      <Header />
      <div class="error-page">
        <h1>Feil oppstod</h1>
        <p>{message}</p>
      </div>
    </BaseLayout>
  );
};
export { Error };
