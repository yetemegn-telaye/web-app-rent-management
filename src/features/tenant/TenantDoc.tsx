import ImageOverlay from "../../components/ImageOverlay";
import contractImage from "../../assets/images/contract.jpg";

const TenantDoc: React.FC = () => {
    return(
        <div className="flex justify-between mt-10">
        <div className="flex flex-col items-start justify-between gap-8">
        <h3 className="text-secondary-dark text-xl font-light ml-2">Tenant Identifcation</h3>
        <ImageOverlay imageUrl={contractImage} />
        </div>
        <div className="flex flex-col items-start justify-between gap-8">
        <h3 className="text-secondary-dark text-xl font-light ml-2">Tenant Business Lisence</h3>
        <ImageOverlay imageUrl={contractImage} />
        </div>
    
    </div>
    );
}
export default TenantDoc;