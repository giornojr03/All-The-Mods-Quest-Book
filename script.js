const questData = [
    {
        name: "Getting Started",
        description: "Your first steps",
        quests: [
            {
                name: "Punching Trees",
                description: "Gather your first materials.",
                tasks: [
                    "Gather 16 logs",
                    "Craft a crafting table"
                ]
            },
            {
                name: "Stone Age",
                description: "Upgrade your basic tools.",
                tasks: [
                    "Gather 32 cobblestone",
                    "Craft stone tools"
                ]
            },
            {
                name: "First Furnace",
                description: "Begin processing materials.",
                tasks: [
                    "Craft a furnace",
                    "Smelt 8 iron"
                ]
            }
        ]
    },

    {
        name: "Storage",
        description: "Organize your base",
        quests: [
            {
                name: "Early Storage",
                description: "Create your first storage area.",
                tasks: [
                    "Craft 4 chests",
                    "Store 20 different items"
                ]
            },
            {
                name: "Functional Storage",
                description: "Start using bulk storage.",
                tasks: [
                    "Craft a drawer",
                    "Craft a storage controller",
                    "Connect a drawer"
                ]
            },
            {
                name: "Digital Storage",
                description: "Prepare for digital storage.",
                tasks: [
                    "Collect quartz",
                    "Craft basic storage components"
                ]
            }
        ]
    },

    {
        name: "Power",
        description: "Generate FE",
        quests: [
            {
                name: "First Generator",
                description: "Create your first power source.",
                tasks: [
                    "Craft a generator",
                    "Generate 10,000 FE"
                ]
            },
            {
                name: "Power Storage",
                description: "Store your energy.",
                tasks: [
                    "Craft an energy cell",
                    "Charge it completely"
                ]
            }
        ]
    },

    {
        name: "Mining",
        description: "Resources and exploration",
        quests: [
            {
                name: "Better Tools",
                description: "Improve your mining setup.",
                tasks: [
                    "Craft an iron pickaxe",
                    "Craft a bucket",
                    "Bring torches"
                ]
            },
            {
                name: "Ore Collection",
                description: "Stockpile important resources.",
                tasks: [
                    "Gather iron",
                    "Gather copper",
                    "Gather redstone",
                    "Gather diamonds"
                ]
            }
        ]
    },

    {
        name: "Mekanism",
        description: "Industrial progression",
        quests: [
            {
                name: "Mekanism Basics",
                description: "Enter the Mekanism progression line.",
                tasks: [
                    "Craft a Metallurgic Infuser",
                    "Generate steel"
                ]
            },
            {
                name: "Ore Processing",
                description: "Increase your ore production.",
                tasks: [
                    "Build an enrichment setup",
                    "Automate one ore"
                ]
            }
        ]
    },

    {
        name: "Mystical Agriculture",
        description: "Resource crops",
        quests: [
            {
                name: "Inferium",
                description: "Begin growing resources.",
                tasks: [
                    "Obtain Inferium Essence",
                    "Craft a seed",
                    "Plant the seed"
                ]
            },
            {
                name: "Essence Automation",
                description: "Scale up production.",
                tasks: [
                    "Automate harvesting",
                    "Automate replanting"
                ]
            }
        ]
    },

    {
        name: "Automation",
        description: "Make your base work for you",
        quests: [
            {
                name: "Item Transport",
                description: "Move items automatically.",
                tasks: [
                    "Craft an item transport system",
                    "Automate one machine"
                ]
            },
            {
                name: "Auto-Crafting",
                description: "Automate recipes.",
                tasks: [
                    "Choose a crafting system",
                    "Store components",
                    "Complete an automated recipe"
                ]
            }
        ]
    },

    {
        name: "Endgame",
        description: "Final progression",
        quests: [
            {
                name: "Endgame Preparation",
                description: "Prepare for the final stages.",
                tasks: [
                    "Upgrade your gear",
                    "Stock food",
                    "Prepare an escape method"
                ]
            },
            {
                name: "ATM10 Completion",
                description: "Finish your progression.",
                tasks: [
                    "Complete your major quest lines",
                    "Build something ridiculous"
                ]
            }
        ]
    }
];

const STORAGE_KEY = "atm10QuestProgress";

let savedProgress =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function getID(column, quest, task) {
    return `${column}-${quest}-${task}`;
}

function render() {
    const container = document.getElementById("columns");
    const search =
        document.getElementById("search").value.toLowerCase();

    container.innerHTML = "";

    questData.forEach((column, columnIndex) => {

        const columnElement =
            document.createElement("div");

        columnElement.className = "column";

        const header =
            document.createElement("div");

        header.className = "column-header";

        header.innerHTML = `
            <h2>${column.name}</h2>
            <small>${column.description}</small>
        `;

        columnElement.appendChild(header);

        column.quests.forEach((quest, questIndex) => {

            const text = (
                column.name +
                quest.name +
                quest.description +
                quest.tasks.join(" ")
            ).toLowerCase();

            if (search && !text.includes(search)) {
                return;
            }

            const questElement =
                document.createElement("details");

            questElement.className = "quest";

            const completed =
                quest.tasks.every(
                    (_, taskIndex) =>
                        savedProgress[
                            getID(
                                columnIndex,
                                questIndex,
                                taskIndex
                            )
                        ]
                );

            if (completed) {
                questElement.classList.add("completed");
            }

            const summary =
                document.createElement("summary");

            summary.innerHTML = `
                <div class="quest-title">
                    ${quest.name}
                </div>

                <div class="quest-description">
                    ${quest.description}
                </div>
            `;

            questElement.appendChild(summary);

            const body =
                document.createElement("div");

            body.className = "quest-body";

            quest.tasks.forEach((task, taskIndex) => {

                const label =
                    document.createElement("label");

                label.className = "check";

                const checkbox =
                    document.createElement("input");

                checkbox.type = "checkbox";

                const id =
                    getID(
                        columnIndex,
                        questIndex,
                        taskIndex
                    );

                checkbox.checked =
                    !!savedProgress[id];

                checkbox.addEventListener(
                    "change",
                    () => {

                        savedProgress[id] =
                            checkbox.checked;

                        localStorage.setItem(
                            STORAGE_KEY,
                            JSON.stringify(savedProgress)
                        );

                        render();
                    }
                );

                label.appendChild(checkbox);

                const text =
                    document.createElement("span");

                text.textContent = task;

                label.appendChild(text);

                body.appendChild(label);
            });

            questElement.appendChild(body);

            columnElement.appendChild(questElement);
        });

        if (columnElement.querySelector(".quest")) {
            container.appendChild(columnElement);
        }
    });

    updateProgress();
}

function updateProgress() {

    let total = 0;
    let completed = 0;

    questData.forEach((column, columnIndex) => {

        column.quests.forEach((quest, questIndex) => {

            quest.tasks.forEach((_, taskIndex) => {

                total++;

                if (
                    savedProgress[
                        getID(
                            columnIndex,
                            questIndex,
                            taskIndex
                        )
                    ]
                ) {
                    completed++;
                }
            });
        });
    });

    const percentage =
        total === 0
            ? 0
            : Math.round(
                completed / total * 100
            );

    document.getElementById("progressText")
        .textContent = percentage + "%";

    document.getElementById("progressBar")
        .style.width = percentage + "%";
}

document.getElementById("search")
    .addEventListener("input", render);

document.getElementById("expandAll")
    .addEventListener("click", () => {

        document
            .querySelectorAll(".quest")
            .forEach(quest => quest.open = true);

    });

document.getElementById("collapseAll")
    .addEventListener("click", () => {

        document
            .querySelectorAll(".quest")
            .forEach(quest => quest.open = false);

    });

document.getElementById("reset")
    .addEventListener("click", () => {

        if (confirm("Reset all quest progress?")) {

            savedProgress = {};

            localStorage.removeItem(STORAGE_KEY);

            render();
        }

    });

render();
