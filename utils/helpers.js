import hbs from "hbs";

hbs.registerHelper("CLP", (num) => {
    const formatoCL = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        useGrouping: true,
    });

    return formatoCL.format(num);
});

