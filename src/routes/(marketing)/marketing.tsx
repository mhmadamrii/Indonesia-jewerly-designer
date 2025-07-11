import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(marketing)/marketing")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <p>This is the marketing page.</p>
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum ipsam suscipit
        numquam harum repellendus officiis aspernatur deleniti, odit dignissimos. Ad fuga
        reprehenderit alias, impedit modi neque reiciendis cupiditate dignissimos
        aspernatur mollitia accusantium consectetur iure velit earum? Qui, fuga unde?
        Deserunt repudiandae porro reprehenderit. Aspernatur vel obcaecati provident hic
        molestiae aliquid, fugiat explicabo quibusdam accusamus, fugit veniam harum iure
        odio sit libero asperiores deleniti, id eius? Iure architecto eveniet praesentium
        expedita exercitationem corrupti cupiditate nostrum maiores quas sunt et velit
        unde accusamus, sint ducimus minima. Fugit saepe, numquam sunt debitis commodi rem
        enim perspiciatis. Earum alias repellendus officiis beatae ad blanditiis.
      </span>
    </section>
  );
}
