const loadAllPhones = async (status, searchBox) => {
    spinner.style.display = 'none'

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox ? searchBox : 'iphone'}`);
    const data = await res.json()

    if (status) {
        loadPhone(data.data)
    }
    else {

        loadPhone(data.data.slice(0, 6))
    }

    // loadPhoneData()
}

// const loadPhoneData = async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
//     const data = await res.json()
//     loadPhone(data.data)
// }

const loadPhone = (phoneDatas) => {
    if(phoneDatas.length == 0) {
        alert('Invalid Input')
    }
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = ''
    phoneDatas.forEach(phoneData => {
        const { brand, phone_name:name, slug, image } = phoneData
        const card = document.createElement('div');
        card.className = ('p-6 border rounded-lg box-border border-[#CFCFCF] text-center w-[364px]')
        card.innerHTML = `
            <img class="p-12 bg-[#0D6EFD0D] rounded-lg w-full" src="${image}" alt="">
            <h4 class="text-xl font-bold mt-6">${brand}</h4>
            <h4 class="text-lg font-bold mt-6">${name}</h4>
            <p class="text-lg mt-2 leading-8">There are many variations of passages of available, but the majority have suffered</p>
            <h4 class="text-xl font-bold mt-2 mb-4">$999</h4>
            <button onclick = "loadDetails('${slug}')" class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Show Details</button>
        `
        phoneContainer.appendChild(card)
    })
}

const loadDetails = async (slug) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    const data = await res.json()
    showDetails(data.data)
    console.log(data.data)
}

const showDetails = (details) => {
    const phoneDetails = document.getElementById('phoneDetails')
    // console.log(details)
    phoneDetails.className = ('p-6 rounded-lg box-border')
    phoneDetails.innerHTML = `
    <img class="p-12 bg-[#0D6EFD0D] rounded-lg w-full" src="${details.image}" alt="">
    <h4 class="text-xl font-bold mt-6">${details.name}</h4>
    <p class="text-lg mt-2 leading-8">There are many variations of passages of available, but the majority have suffered</p>
    <p class="text-lg mt-2"><span class = 'font-medium text-xl'>Storage: </span>${details.mainFeatures.storage}</p>
    <p class="text-lg mt-2"><span class = 'font-medium text-xl'>Display Size: </span>${details.mainFeatures.displaySize}</p>
    <p class="text-lg mt-2"><span class = 'font-medium text-xl'>chipSet: </span>${details.mainFeatures.chipSet}</p>
    <p class="text-lg mt-2"><span class = 'font-medium text-xl'>Memory: </span>${details.mainFeatures.memory}</p>
    <p class="text-lg mt-2"><span class = 'font-medium text-xl'>Slug: </span>${details.slug}</p>
    <p class="text-lg mt-2"><span class = 'font-medium text-xl'>Release Date: </span>${details.releaseDate}</p>
    <p class="text-lg mt-2"><span class = 'font-medium text-xl'>Brand: </span>${details.brand}</p>
    `
    document.getElementById('my_modal_5').showModal()
}

const spinner = document.getElementById('spinner')

const handleSearch = () => {
    spinner.style.display = 'block'
    const searchBox = document.getElementById('search-box').value;
    setTimeout(() => {
        loadAllPhones(false, searchBox)
    }, 3000);
}

const handleShowAll = () => {
    loadAllPhones(true, 'phone')
}

// loadAllPhones()