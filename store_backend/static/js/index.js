function resetForm() {
  document.getElementById("myForm").reset();
}

$("#confirm-delete-btn").on("click", function (event) {
  var storeId = $("#delete").data("store-id");
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
    var storeId = $("#edit").data("store-id");
    $(`#store_pic_${storeId}`).on('change', function(event) {
        var input = event.target;
        var reader = new FileReader();

        reader.onload = function() {
            $(`#imagePreview_${storeId}`).attr('src', reader.result);
        };

        reader.readAsDataURL(input.files[0]);
    });
});


