import { exercises, workouts, tempos, schemes } from "./exercises.js"
const flattenedExercises = exercisesFlattener(exercises)

export function generateWorkout(args) {
    const { muscles, workout, scheme, bw } = args
    let exer = Object.keys(flattenedExercises);
    exer = exer.filter((key) => {
        return bw ? flattenedExercises[key].meta.environment.includes("home") : flattenedExercises[key].meta.environment !== "home"
    });
    let includedTracker = [];
    let numSets = 5;
    let listOfMuscles;

    if (workout === "individual") {
        listOfMuscles = muscles;
    } else {
        listOfMuscles = workouts[workout][muscles[0]];
    }

    listOfMuscles = new Set(shuffleArray(listOfMuscles));
    let arrOfMuscles = Array.from(listOfMuscles);
    let sets = schemes[scheme].ratio
        .reduce((acc, curr, index) => {
            //make this compound and exercise muscle -> array of objects and destructure in loop
            return [
                ...acc,
                ...[...Array(parseInt(curr)).keys()].map((val) =>
                    index === 0 ? "compound" : "accessory"
                ),
            ];
        }, [])
        .reduce((acc, curr, index) => {
            const muscleGroupToUse =
                index < arrOfMuscles.length
                    ? arrOfMuscles[index]
                    : arrOfMuscles[index % arrOfMuscles.length];
            return [
                ...acc,
                {
                    setType: curr,
                    muscleGroup: muscleGroupToUse,
                },
            ];
        }, []);

    const { compound: compoundexercises, accessory: accessoryexercises } =
        exer.reduce(
            (acc, curr) => {
                let exerciseHasRequiredMuscle = false;
                for (const musc of flattenedExercises[curr].muscles) {
                    if (listOfMuscles.has(musc)) {
                        exerciseHasRequiredMuscle = true;
                    }
                }
                return exerciseHasRequiredMuscle
                    ? {
                        ...acc,
                        [flattenedExercises[curr].type]: {
                            ...acc[flattenedExercises[curr].type],
                            [curr]: flattenedExercises[curr],
                        },
                    }
                    : acc;
            },
            { compound: {}, accessory: {} }
        );

    const genWOD = sets.map(({ setType, muscleGroup }) => {
        const data =
            setType === "compound" ? compoundexercises : accessoryexercises;
        const filteredObj = Object.keys(data).reduce((acc, curr) => {
            if (
                includedTracker.includes(curr) ||
                !data[curr].muscles.includes(muscleGroup)
            ) {
                // if (includedTracker.includes(curr)) { console.log('banana', curr) }
                return acc;
            }
            return { ...acc, [curr]: flattenedExercises[curr] };
        }, {});
        const filteredDataList = Object.keys(filteredObj);
        const filteredOppList = Object.keys(
            setType === "compound" ? accessoryexercises : compoundexercises
        ).filter((val) => !includedTracker.includes(val));

        let randomExercise =
            filteredDataList[
            Math.floor(Math.random() * filteredDataList.length)
            ] ||
            filteredOppList[
            Math.floor(Math.random() * filteredOppList.length)
            ];

        // console.log(randomExercise)

        if (!randomExercise) {
            return {};
        }

        let repsOrDuraction =
            flattenedExercises[randomExercise].unit === "reps"
                ? Math.min(...schemes[scheme].repRanges) +
                Math.floor(
                    Math.random() *
                    (Math.max(...schemes[scheme].repRanges) -
                        Math.min(...schemes[scheme].repRanges))
                ) +
                (setType === "accessory" ? 4 : 0)
                : Math.floor(Math.random() * 40) + 20;
        const tempo = tempos[Math.floor(Math.random() * tempos.length)];

        if (flattenedExercises[randomExercise].unit === "reps") {
            const temposum = tempo
                .split(" ")
                .reduce((acc, curr) => acc + parseInt(curr), 0);
            if (temposum * parseInt(repsOrDuraction) > 85) {
                repsOrDuraction = Math.floor(85 / temposum);
            }
        } else {
            //set to nearest 5 seconds
            repsOrDuraction = Math.ceil(parseInt(repsOrDuraction) / 5) * 5;
        }
        includedTracker.push(randomExercise);

        return {
            name: randomExercise,
            tempo,
            rest: schemes[scheme]["rest"][setType === "compound" ? 0 : 1],
            reps: repsOrDuraction,
            ...flattenedExercises[randomExercise],
        };
    });

    return genWOD.filter(
        (element) => Object.keys(element).length > 0
    );
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

function exercisesFlattener(exercisesObj) {
    const flattenedObj = {}

    for (const [key, val] of Object.entries(exercisesObj)) {
        if (!("variants" in val)) {
            flattenedObj[key] = val
        } else {
            for (const variant in val.variants) {
                let variantName = variant + "_" + key
                let variantSubstitutes = Object.keys(val.variants).map((element) => {
                    return element + ' ' + key
                }).filter(element => element.replaceAll(' ', '_') !== variantName)

                flattenedObj[variantName] = {
                    ...val,
                    description: val.description + '___' + val.variants[variant],
                    substitutes: [
                        ...val.substitutes, variantSubstitutes
                    ].slice(0, 5)
                }
            }
        }
    }
    return flattenedObj
}




//////////////////////////////////////////////

export let tempWorkout = [
    {
        "name": "standard_barbell_curls",
        "tempo": "5 3 1",
        "rest": 120,
        "reps": 7,
        "type": "compound",
        "meta": {
            "environment": "gymhome",
            "level": [
                0,
                1,
                2
            ],
            "equipment": [
                "barbell"
            ]
        },
        "variants": {
            "wide_grip": "Perform this exercise with hands space one and a half times shoulder width apart.",
            "narrow_grip": "Perform this exercise with hands only a palms width apart.",
            "standard": "Perform this exercise with hands spaced shoulder width apart."
        },
        "unit": "reps",
        "muscles": [
            "biceps"
        ],
        "description": "Hold the barbell with a supinated grip and reduce shoulder engagement and swinging throughout the curl.___Perform this exercise with hands spaced shoulder width apart.",
        "substitutes": [
            "dumbbell curls",
            "wide_grip barbell_curls",
            "narrow_grip barbell_curls"
        ]
    },
    {
        "name": "dumbbell_skull_crushers",
        "tempo": "2 2 2",
        "rest": 120,
        "reps": 4,
        "type": "compound",
        "meta": {
            "environment": "gymhome",
            "level": [
                0,
                1,
                2
            ],
            "equipment": [
                "dumbbells"
            ]
        },
        "unit": "reps",
        "muscles": [
            "triceps"
        ],
        "description": "Lie either flat or on a slight incline with heavy dumbbells in each hand directly above your skull. Starting with your arms straight, lower the weight down either either side of your forehead and then press it back up. Begin with palms facing the ceiling to neutral grip besides your ears.",
        "substitutes": [
            "face press"
        ]
    },
    {
        "name": "supinated_dumbbell_curls",
        "tempo": "2 2 2",
        "rest": 120,
        "reps": 5,
        "type": "compound",
        "meta": {
            "environment": "gymhome",
            "level": [
                0,
                1,
                2
            ],
            "equipment": [
                "dumbbells",
                "bands"
            ]
        },
        "variants": {
            "hammer": "Perform this exercise with a neutral grip, palms facing your body throughout the movement.",
            "supinated": "Maintain a supinated grip on the dumbbell throughout the motion - palms facing forwards through to upwards.",
            "alternating": "Begin the curl with dumbbells in a neutral grip, finishing with you palm supinated and facing the ceiling."
        },
        "unit": "reps",
        "muscles": [
            "biceps"
        ],
        "description": "Perform this exercise seated or standing with dumbbells in either hand by your sides. You can perform both hands at the same time or alternating. Curl each dumbbell upwards from your side until your elbows are fully bent, and the dumbbell is raised. Minimise swinging or shoulder usage throughout the movement.___Maintain a supinated grip on the dumbbell throughout the motion - palms facing forwards through to upwards.",
        "substitutes": [
            "hammer curls",
            "hammer dumbbell_curls",
            "alternating dumbbell_curls"
        ]
    },
    {
        "name": "unilateral_cable_push_aways",
        "tempo": "2 1 1",
        "rest": 60,
        "reps": 7,
        "type": "accessory",
        "meta": {
            "environment": "gymhome",
            "level": [
                0,
                1,
                2
            ],
            "equipment": [
                "bands"
            ]
        },
        "unit": "reps",
        "muscles": [
            "triceps"
        ],
        "description": "Lie either flat or on a slight incline with heavy dumbbells in each hand directly above your skull. Starting with your arms straight, lower the weight down either either side of your forehead and then press it back up. Begin with palms facing the ceiling to neutral grip besides your ears.",
        "substitutes": [
            "face press"
        ]
    },
    {
        "name": "unilateral_hammer_cable_curl",
        "tempo": "4 1 1",
        "rest": 60,
        "reps": 7,
        "type": "accessory",
        "meta": {
            "environment": "gymhome",
            "level": [
                0,
                1,
                2
            ],
            "equipment": [
                "bands"
            ]
        },
        "unit": "reps",
        "muscles": [
            "biceps"
        ],
        "description": "Holding the carribena, of the cable machine on the lowest elevation, in one hand, curl upwards and inwards so your hand finishes in the middle of your chest.",
        "substitutes": [
            "hammer curl"
        ]
    }
]