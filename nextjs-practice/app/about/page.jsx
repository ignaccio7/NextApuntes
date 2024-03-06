"use client"

import { useRouter } from "next/navigation";

export default function About() {

  const router = useRouter()

  const handleClick = () => {
    alert('Cualquier accion se podria hacer aqui')
    router.push('/')
  }

  return (
    <>
      <h1>About Page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum quas
        dolorum inventore impedit repudiandae illo, quos porro consequatur
        laborum, itaque consectetur nemo voluptate, eius aut velit non excepturi
        quae perspiciatis? Nam sapiente nostrum et sed maiores molestiae
        reiciendis perferendis dolores suscipit, vero beatae fuga saepe
        aspernatur veritatis quos nesciunt architecto quidem iste. Natus, minima
        architecto cum in aliquid debitis quo. Enim tenetur sed minus eveniet
        sapiente dolor officiis consequatur, necessitatibus fuga hic itaque ut.
        Beatae error magnam iusto deleniti aliquam cupiditate optio velit
        perspiciatis sit temporibus placeat, culpa, voluptatem vel. Omnis quam,
        magni excepturi cumque quisquam dolorum quia accusamus facilis nobis
        praesentium, fugit quis ab, dolorem nam id modi maiores facere cum
        debitis. Doloremque velit cum iure vitae assumenda delectus. Hic ut,
        eius libero reiciendis totam sed accusantium quidem error molestiae,
        veritatis debitis fugiat temporibus vero nisi officia amet sunt, sit
        optio voluptate dolore perferendis voluptates corporis? Impedit, iure
        eum! Possimus provident vel quia minima sint? Animi ut quod non
        accusantium excepturi fugit illo voluptate fuga voluptas eaque eius
        dignissimos, culpa distinctio ullam aliquid commodi inventore laudantium
        rerum tempora iure. Fugiat earum distinctio accusantium, esse suscipit
        sint ex in maxime? Mollitia officia ratione, incidunt qui voluptates a,
        voluptate aut, repudiandae repellat aperiam modi explicabo eius quidem
        praesentium. Quibusdam, totam dolores? Corporis necessitatibus
        repudiandae dicta sed officiis quaerat iure, corrupti sequi laborum
        dolores itaque facilis quibusdam deserunt molestiae repellendus minima
        magni, provident veritatis illum obcaecati. Pariatur reprehenderit id
        eum veniam vitae. Dolores, vel. Soluta quo sequi obcaecati odit beatae
        delectus perspiciatis exercitationem odio incidunt, et nihil corporis
        minus eum qui, maiores nisi sint veniam nulla ab quisquam in! Amet,
        iusto ipsa. Vero dolor sint necessitatibus sit tempore reiciendis
        ducimus odio obcaecati autem quos dolorum ipsam voluptatibus vel quae
        incidunt exercitationem esse officiis accusantium quia, tenetur
        consequatur ea voluptatum sed molestias. Maiores! Vero fuga architecto
        omnis aliquid, magni exercitationem reiciendis dolorem ex consequatur
        dolorum incidunt laboriosam non, repellat asperiores rerum obcaecati
        sequi. Distinctio quidem dolores neque iure praesentium quas architecto
        impedit voluptatibus. Ad fuga sit obcaecati, quis rerum ipsam dolor ut,.
      </p>
      <button className="p-2 bg-cyan-900 rounded-md" onClick={handleClick}>
        Volver al inicio con router
      </button>
    </>
  );
}
