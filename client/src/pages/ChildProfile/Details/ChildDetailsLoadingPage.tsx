import { useParams } from 'react-router-dom';

const ChildDetailsLoadingPage = () => {
    const { childId } = useParams<{ childId: string }>();
    console.log(childId);

    return (
        <div>
            <p> newComponent </p>
        </div>
    );
};

export default ChildDetailsLoadingPage;
