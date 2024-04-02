import { Puff } from 'react-loader-spinner';

export default function Loading() {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Puff
                color="#0000FF"
                height={100}
                width={100}
                timeout={3000}
            />
        </div>
    );
}