import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getListingFeatures } from "./listingSlice";

type ListingFeaturesProps = {
    spaceId: number ;
};

const ListingFeatures:React.FC<ListingFeaturesProps> = ({spaceId}) => {
    const dispatch = useDispatch<AppDispatch>();
    const features = useSelector((state: RootState) => state.listing.feature);

    useEffect(()=>{
        dispatch(getListingFeatures(spaceId))
        .then(() => {
           console.log('features', features);
        })
        .catch((error) => {
            alert(error);
        });
    
       },[dispatch,features]);

    return(
        <div className="flex justify-around bg-white w-full p-6 py-8 shadow-md">
            <div className="flex flex-col items-center w-1/2 gap-6">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/2 gap-6">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Listed Date</span>
                    <p className="text-secondary-dark font-semibold"> January 02, 2024</p>
                </div>
            </div>
        </div>
    )
}
export default ListingFeatures;