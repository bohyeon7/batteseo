import Wrapper from "./wrapper"

export default function Footer() {
  return(
    <footer className="w-full p-6">
      <hr className="my-6 border-gray-400 mx-auto" />
      <div className="text-gray-400 flex justify-center items-center space-x-3">
          <div className="flex space-x-1 text-lg">
            <span>🌱</span>
            <span className="font-semibold">봉화밭에서</span>
          </div>
          <div className="text-md">
            <p>
              010 2950 6132
            </p>
          </div>
      </div>
    </footer>
  )
}