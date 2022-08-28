const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

(function () {
        var add_row;

        $('#add-row').on('click', function (e) {
            var table_body;
            e.preventDefault();
            table_body = $(e.target).data().table;
            if (table_body) {
                return add_row(table_body);
            }
        });

        add_row = function (table_body_element) {
            var $cloner, $new_row, $rows, $tbody, count, inputs;
            // Get some variables for the tbody and the row to clone.
            $tbody = $('#' + table_body_element);
            $rows = $($tbody.children('tr'));
            $cloner = $rows.eq(0);
            count = $rows.length;
            // Clone the row and get an array of the inputs.
            $new_row = $cloner.clone();
            inputs = $new_row.find('.dyn-input');
            // Change the name and id for each input.
            $.each(inputs, function (i, v) {
                var $input, $label, checked;
                $input = $(v);
                // Find the label for input and adjust it.
                $label = $new_row.find(`label[for='${$input.attr('id')}']`);
                $label.attr({
                    'for': $input.attr('id').replace(/\[.*\]/, `[${count + 1}]`)
                });
                $input.attr({
                    'name': $input.attr('name').replace(/\[.*\]/, `[${count + 1}]`),
                    'id': $input.attr('id').replace(/\[.*\]/, `[${count + 1}]`)
                });
                // Remove values and checks.
                $input.val('');
                checked = $input.prop('checked');
                if (checked) {
                    return $input.prop('checked', false);
                }
            });
            // Add the new row to the tbody.
            return $tbody.append($new_row);
        };

    }).call(this);