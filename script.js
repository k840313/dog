// 當頁面載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    const savedBirthday = localStorage.getItem('dogBirthday');
    const savedSize = localStorage.getItem('dogSize');

    // 如果有儲存的生日，自動填入
    if (savedBirthday) {
        document.getElementById('dog-birthday').value = savedBirthday;
    }

    // 如果有儲存的體型，自動勾選
    if (savedSize) {
        const sizeRadio = document.querySelector(`input[name="dog-size"][value="${savedSize}"]`);
        if (sizeRadio) {
            sizeRadio.checked = true;
        }
    }
    
    // 如果已有舊資料，可以選擇是否自動執行一次計算
    if (savedBirthday) {
        calculateAge();
    }
});

document.getElementById('calculate-btn').addEventListener('click', calculateAge);

function calculateAge() {
    const birthdayInput = document.getElementById('dog-birthday').value;
    const selectedSizeElement = document.querySelector('input[name="dog-size"]:checked');
    const resultArea = document.getElementById('result-area');
    const dogAgeDisplay = document.getElementById('dog-age-display');
    const humanAgeDisplay = document.getElementById('human-age-display');

    if (!birthdayInput) {
        alert("請先選擇狗狗的生日喔！🐾");
        return;
    }

    // --- 新增：將選擇的資料儲存到 localStorage ---
    localStorage.setItem('dogBirthday', birthdayInput);
    if (selectedSizeElement) {
        localStorage.setItem('dogSize', selectedSizeElement.value);
    }
    // ------------------------------------------

    const dogSize = selectedSizeElement.value;
    const birthday = new Date(birthdayInput);
    const today = new Date();

    if (birthday > today) {
        alert("生日不能是未來的日期喔！");
        return;
    }

    // 計算狗狗實際年齡 (保留一位小數)
    let ageInYears = (today - birthday) / (1000 * 60 * 60 * 24 * 365.25);
    ageInYears = Math.max(0, parseFloat(ageInYears.toFixed(1)));

    dogAgeDisplay.innerText = ageInYears;

    // 計算換算成人類的年齡
    let humanAge = 0;

    if (ageInYears <= 1) {
        humanAge = ageInYears * 15;
    } else if (ageInYears <= 2) {
        humanAge = 15 + (ageInYears - 1) * 9;
    } else {
        const baseHumanAge = 24; 
        const remainingYears = ageInYears - 2;

        if (dogSize === 'small') {
            humanAge = baseHumanAge + remainingYears * 4;
        } else if (dogSize === 'medium') {
            humanAge = baseHumanAge + remainingYears * 5;
        } else if (dogSize === 'large') {
            humanAge = baseHumanAge + remainingYears * 6;
        }
    }

    humanAgeDisplay.innerText = Math.round(humanAge);
    resultArea.classList.remove('hidden');
}