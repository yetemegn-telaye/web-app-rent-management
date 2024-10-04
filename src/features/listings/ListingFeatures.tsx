import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getAllListingFeatures, getListingFeatures } from "./listingSlice";

type ListingFeaturesProps = {
    spaceId: number ;
};

const ListingFeatures:React.FC<ListingFeaturesProps> = ({spaceId}) => {
    const dispatch = useDispatch<AppDispatch>();
    const defaultFeature = {
        surveillance_camera: false,
        previous_use: '',
        position_on_building: '',
        conference_rooms: 0,
        wall_paint: '',
        natural_light: false,
        high_ceiling: false,
        balcony: false,
        furnished: false,
        space_id: 0,
    }
    const all_features = useSelector((state: RootState) => state.listing.all_features) || defaultFeature;
    const features = all_features.find((feature) => feature.space_id === spaceId);


    useEffect(()=>{
        dispatch(getAllListingFeatures());
       });


    return(
        <div className="flex justify-around bg-white w-full p-6 py-8 shadow-md">
            <div className="flex flex-col items-center w-1/2 gap-6">
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">Surveillance Camera</span>
                    <p className="text-secondary-dark font-semibold"> {features?.surveillance_camera.toString()}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">Position On Building</span>
                    <p className="text-secondary-dark font-semibold"> {features?.position_on_building}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">Previous Use</span>
                    <p className="text-secondary-dark font-semibold"> {features?.previous_use}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">Wall paint</span>
                    <p className="text-secondary-dark font-semibold"> {features?.wall_paint}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">Natural Lighting</span>
                    <p className="text-secondary-dark font-semibold"> {features?.natural_lighting.toString()}</p>
                </div>
             
           
            </div>
            <div className="flex flex-col items-center w-1/2 gap-6">
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">Furnished</span>
                    <p className="text-secondary-dark font-semibold"> {features?.furnished.toString()}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">Space Id</span>
                    <p className="text-secondary-dark font-semibold"> {features?.space_id}</p>
                </div>
                
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">Conference Rooms</span>
                    <p className="text-secondary-dark font-semibold"> {features?.conference_rooms}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">High Ceiling</span>
                    <p className="text-secondary-dark font-semibold"> {features?.high_ceiling.toString()}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-sm text-gray-400">Balcony Available</span>
                    <p className="text-secondary-dark font-semibold"> {features?.balcony.toString()}</p>
                </div>
            </div>
        </div>
    )
}
export default ListingFeatures;