import { MagnifyingGlass } from 'react-loader-spinner';

export default function Loader() {
  return (
    <MagnifyingGlass
      visible={true}
      height="180"
      width="180"
      ariaLabel="MagnifyingGlass-loading"
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
      wrapperStyle={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
