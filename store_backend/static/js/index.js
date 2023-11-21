function resetForm() {
  document.getElementById("myForm").reset();
}

$("#confirm-delete-btn").on("click", function (event) {
  let storeId = $("#delete").data("store-id");
  console.log(storeId);
  // Perform AJAX request to delete the record
  $.ajax({
    url: "/stores/" + storeId,
    type: "DELETE",
    success: function (data) {
      if (data.success) {
        console.log("Deletion successful");
      } else {
        console.error("Deletion failed");
      }
      // Close the modal
      $("#deleteStore").modal("hide");
      location.reload(true);
    },
    error: function (error) {
      console.error("Error during deletion:", error);
      // Close the modal even if there's an error
      $("#deleteStore").modal("hide");
    },
  });
});

$(document).ready(function() {
    let storeId = $("#edit").data("store-id");
    $(`#store_pic_${storeId}`).on('change', function(event) {
        let input = event.target;
        let reader = new FileReader();

        reader.onload = function() {
            $(`#imagePreview_${storeId}`).attr('src', reader.result);
        };

        reader.readAsDataURL(input.files[0]);
    });
});

// let dataset = {{ data|tojson }}
let dataArray;
$.ajax({
  type: "GET",
  url: "http://localhost:5000/data",
  success: function (response) {
    console.log(response);
    dataArray = response.data
    processData(dataArray);

  }
});
// console.log(dataArray)
function processData(dataArray) {
  // Perform actions that depend on dataArray here
  let chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Sales",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        data: dataArray,
      },
    ],
  };
  
  // Get the canvas element and initialize the chart
  let ctx = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
  });
  console.log(dataArray);
}

