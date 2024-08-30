$(function () {
    // Instance the tour
    let tour = new Tour({
        steps: [{
                element: "#input10",
                placement: "auto",
                title: "Title of my step",
                content: "Content of my step"
            },
            {
                element: "#t2",
                placement: "auto",
                title: "Title of my step",
                content: "Content of my step"
            },
            {
                element: "#t3",
                placement: "auto",
                title: "Title of my step",
                content: "Content of my step"
            }, {
                element: "#dropdwonMenuProjects",
                placement: "auto",
                title: "Title of my step",
                content: "Content of my step"
            }
        ]
    });

    // Initialize the tour
    tour.init();

    // Start the tour
    tour.start();
    $("#startTourBtn").click(function () {
        tour.restart();
    });
});