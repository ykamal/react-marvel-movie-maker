import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="block text-teal-600" role="link">
      <span className="sr-only">Home</span>
      <svg
        fill="#000000"
        width="30px"
        height="30px"
        viewBox="0 0 96 96"
        xmlns="http://www.w3.org/2000/svg"
        role="image"
      >
        <path
          d="M39 5.08c-2.475.473-7.628 2.454-11.451 4.401l-6.951 3.541-4.299-4.219C13.935 6.482 12 4.889 12 5.262c0 3.96-3.553 23.4-4.999 27.352C-4.373 63.698 22.267 96.56 54.509 91.217c27.478-4.553 43.997-32.621 34.49-58.603C87.553 28.662 84 9.222 84 5.262c0-.373-1.935 1.22-4.299 3.541l-4.299 4.219-6.951-3.524C58.365 4.385 49.55 3.062 39 5.08m-1.904 8.369C24.75 17.461 12 32.729 12 43.501c0 .776 5.072 1.8 14.75 2.978 8.112.986 16.212 2.491 18 3.343 2.934 1.398 3.566 1.398 6.5 0 1.787-.852 9.923-2.361 18.08-3.353l14.83-1.804-.633-3.583C79.99 21.043 56.586 7.114 37.096 13.449M24 30.953c0 5.814 4.682 9.448 11.422 8.865l3.68-.318-7.032-5.25C24.13 28.322 24 28.269 24 30.953m39.701 3.364L56.902 39.5l3.677.318C67.318 40.401 72 36.766 72 30.953c0-2.738-.632-2.481-8.299 3.364M12.575 55.75c6.603 29.599 46.759 38.199 64.302 13.772 3.325-4.63 7.69-15.288 6.677-16.302-1.396-1.396-24.282 2.092-29.871 4.552l-5.817 2.561-4.683-2.286c-4.38-2.139-19.982-4.938-27.952-5.015-3.053-.03-3.229.15-2.656 2.718m30.758 12.945C40.896 69.17 36 73.348 36 74.952 36 75.624 40.302 76 48 76c12.824 0 13.78-.446 9.486-4.426-3.357-3.11-8.06-4.067-14.153-2.879"
          fillRule="evenodd"
          fill="purple"
        />
      </svg>
    </Link>
  );
}
