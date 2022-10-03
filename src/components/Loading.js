import { ObjColor } from '../data/Data';
import { Circles } from 'react-loader-spinner';
import styled from 'styled-components';

const LoadingContainer = styled.div`
margin: 15vw auto;
@media (max-width: 1000px) {
    margin: 25vw auto;
}
@media (max-width: 650px) {
    margin: 30vh auto;
}
`
const Loading = () => {
    return (
        <>
            <LoadingContainer>
                <Circles color={`${ObjColor.background1}`} height={50} width={50} />
            </LoadingContainer>
        </>
    )
}
export default Loading;