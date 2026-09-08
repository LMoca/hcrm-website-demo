import ServicePage from "@/pages/ServicePage";
import { getServiceBySlug } from "@/data/services";
import NotFound from "@/pages/NotFound";

const Page = () => {
  const service = getServiceBySlug("data-normalization-validation");
  return service ? <ServicePage service={service} /> : <NotFound />;
};

export default Page;
