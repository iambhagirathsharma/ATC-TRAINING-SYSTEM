console.log("Manage Trainees JS Loaded");

const API_URL =
"http://localhost:5000/api/trainees";

let editMode = false;
let editId = null;

// ================= LOAD TRAINEES =================

async function loadTrainees()
{
try
{
const response =
await fetch(API_URL);

    const trainees =
    await response.json();

    console.log("DATA", trainees);

    const tableBody =
    document.getElementById(
        "traineeTableBody"
    );

    tableBody.innerHTML = "";

    trainees.forEach(
        (trainee,index)=>
        {
            tableBody.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>${trainee.name}</td>

                <td>${trainee.employeeNo}</td>

                <td>${trainee.unit}</td>

                <td>${trainee.username}</td>

                <td>
                    <span class="badge bg-success">
                        ${trainee.status}
                    </span>
                </td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editTrainee('${trainee._id}')">

                        Edit

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteTrainee('${trainee._id}')">

                        Delete

                    </button>

                </td>

            </tr>
            `;
        }
    );

}
catch(error)
{
    console.log(error);
}


}

// ================= ADD TRAINEE =================

document
.getElementById("saveTraineeBtn")
.addEventListener(
"click",
addTrainee
);

async function addTrainee()
{
const traineeData =
{
name:
document.getElementById("name").value,

    employeeNo:
    document.getElementById("employeeNo").value,

    username:
    document.getElementById("username").value,

    password:
    document.getElementById("password").value,

    unit:
    document.getElementById("unit").value,

    joiningDate:
    document.getElementById("joiningDate").value,

    requiredHours:
    Number(
        document.getElementById(
            "requiredHours"
        ).value
    ),

    requiredDays:
    Number(
        document.getElementById(
            "requiredDays"
        ).value
    ),

    status: "Active"
};

try
{
    if(editMode)
{
    const response =
    await fetch(
        `http://localhost:5000/api/trainees/update/${editId}`,
        {
            method:"PUT",

            headers:
            {
                "Content-Type":"application/json"
            },

            body:JSON.stringify(traineeData)
        }
    );

    const result =
    await response.json();

    alert(result.message);

    editMode = false;
    editId = null;

    document.getElementById(
        "saveTraineeBtn"
    ).textContent = "Save Trainee";

    document.getElementById(
        "traineeForm"
    ).reset();

    loadTrainees();

    return;
}
    const response =
    await fetch(
        "http://localhost:5000/api/trainees/add",
        {
            method: "POST",

            headers:
            {
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(
                traineeData
            )
        }
    );

    const result =
    await response.json();

    alert(
        result.message
    );

    document
    .getElementById(
        "traineeForm"
    )
    .reset();

    loadTrainees();
}
catch(error)
{
    console.log(error);
}


}
async function deleteTrainee(id)
{
const confirmDelete =
confirm(
"Are you sure you want to delete this trainee?"
);

if(!confirmDelete)
{
    return;
}

try
{
    const response =
    await fetch(
        `http://localhost:5000/api/trainees/delete/${id}`,
        {
            method:"DELETE"
        }
    );

    const result =
    await response.json();

    alert(result.message);

    loadTrainees();
}
catch(error)
{
    console.log(error);
}

}

async function editTrainee(id)
{
try
{
const response =
await fetch(API_URL);


    const trainees =
    await response.json();

    const trainee =
    trainees.find(
        t => t._id === id
    );

    if(!trainee)
    {
        return;
    }

    document.getElementById("name").value =
    trainee.name;

    document.getElementById("employeeNo").value =
    trainee.employeeNo;

    document.getElementById("username").value =
    trainee.username;

    document.getElementById("unit").value =
    trainee.unit;

    document.getElementById("joiningDate").value =
    trainee.joiningDate
    ?
    trainee.joiningDate.split("T")[0]
    :
    "";

    document.getElementById("requiredHours").value =
    trainee.requiredHours;

    document.getElementById("requiredDays").value =
    trainee.requiredDays;

    editMode = true;
    editId = id;

    document.getElementById(
    "saveTraineeBtn"
).textContent = "Update Trainee";

const modal =
new bootstrap.Modal(
    document.getElementById(
        "addTraineeModal"
    )
);

modal.show();

}
catch(error)
{
    console.log(error);
}
}
// ================= INITIAL LOAD =================

loadTrainees();