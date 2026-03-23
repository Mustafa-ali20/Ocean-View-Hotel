import { servicesData } from "./servicesData";
import ServiceSection from "./ServiceSection";


const Services = () => {
  return (
    <div >
      {servicesData.map((service) => (
        <ServiceSection key={service.id} data={service} />
      ))}
    </div>
  );
};

export default Services;