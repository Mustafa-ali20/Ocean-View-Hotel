import { useTranslation } from "react-i18next";
import { getServicesData } from "./servicesData";
import ServiceSection from "./ServiceSection";

const Services = () => {
  const { i18n } = useTranslation();
  const servicesData = getServicesData();

  return (
    <div>
      {servicesData.map((service) => (
        <ServiceSection key={service.id} data={service} />
      ))}
    </div>
  );
};

export default Services;