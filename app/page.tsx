import Link from 'next/link';

export default function Page() {


  return (
    <div className="flex flex-col w-full text-center items-center">
      <h1 className="px-5 mt-2">Hello, page làm vội để test nên chưa chăm chút được, sẽ từ từ bổ sung, mong mọi người thông cảm!</h1>
      <h1 className="px-5 mt-2">Để bắt đầu, vui lòng bấm chọn nhân vật bên dưới</h1>
      <Link href={"/characters"}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg mt-3
               text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center">
        {'Tới trang pick Char'}
      </Link>
    </div>
  )
}


