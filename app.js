// ตั้งค่ากุญแจเชื่อมต่อกับ Supabase
const SUPABASE_URL = 'https://hidzzxxixaevdrnruzsm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_1X0s_-_4gdtKUkTIBq4xMw_KQ1EA5nT';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchCars() {
    const carListContainer = document.getElementById('car-list');
    
    // 1. ดึงข้อมูลจากตารางชื่อ 'cars'
    const { data: cars, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching cars:', error);
        carListContainer.innerHTML = '<p class="text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
        return;
    }

    // 2. ล้างหน้าจอ Loading
    carListContainer.innerHTML = '';

    // 3. วนลูปนำข้อมูลมาแสดงผล
    cars.forEach(car => {
        const carCard = `
            <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
                <img src="${car.image_url || 'https://via.placeholder.com/400x250'}" alt="${car.brand}" class="w-full h-48 object-cover">
                <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold">${car.brand} ${car.model}</h3>
                        <span class="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded">${car.year}</span>
                    </div>
                    <p class="text-gray-500 text-sm mb-4">ไมล์: ${Number(car.mileage).toLocaleString()} กม.</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-black text-blue-600">฿${Number(car.price).toLocaleString()}</span>
                        <button class="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition">ดูรายละเอียด</button>
                    </div>
                </div>
            </div>
        `;
        carListContainer.innerHTML += carCard;
    });
}

// เริ่มทำงานเมื่อโหลดหน้าเว็บ
fetchCars();
