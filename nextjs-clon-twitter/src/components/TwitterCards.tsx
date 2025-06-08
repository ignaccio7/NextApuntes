import { Database } from "@/app/types/database"

type PostEntity = Database['public']['Tables']['posts']['Row']
type UserEntity = Database['public']['Tables']['users']['Row']

type Post = PostEntity & { users: UserEntity }

interface Props {
  data: Post[] | null
}

export default function TwitterCards({ data }: Props) {
  return (
    <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Posts Twitter</h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {
            data?.map((post, index) => {
              return (
                <li className="py-3 sm:py-4" key={index}>
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <img className="w-8 h-8 rounded-full" src={post.users.avatar_url} alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {post.users.user_name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">

                        {post.users.user}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {post.content}
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>

  )
}