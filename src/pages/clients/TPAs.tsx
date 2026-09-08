import PersonaPage from "@/pages/PersonaPage";
import { getPersonaBySlug } from "@/data/personas";
import NotFound from "@/pages/NotFound";

const Page = () => {
  const persona = getPersonaBySlug("third-party-administrators");
  return persona ? <PersonaPage persona={persona} /> : <NotFound />;
};

export default Page;
