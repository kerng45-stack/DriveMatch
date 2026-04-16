// 1. ตั้งค่ากุญแจ (ใช้ Publishable key ที่ก๊อปมาใหม่นะครับ)
const SB_URL = 'https://hidzzxxixaevdrnruzsm.supabase.co';
const SB_KEY = 'sb_publishable_1X0s_-_4gdtKUkTIBq4xMw_KQ1EA5nT';

// 2. ใช้ชื่อตัวแปร dMatch_db เพื่อป้องกันชื่อซ้ำกับระบบ
const dMatch_db = supabase.createClient(SB_URL, SB_KEY);

async function fetchCars() {
    const carListContainer = document.getElementById('car-list');
    
    try {
        // 3. ดึงข้อมูลจากตาราง cars โดยใช้ dMatch_db
        const { data: cars, error } = await dMatch_db
            .from('cars')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // ล้างสถานะ Loading
        carListContainer.innerHTML = '';

        if (!cars || cars.length === 0) {
            carListContainer.innerHTML = '<p class="text-center py-10">เชื่อมต่อสำเร็จ แต่ยังไม่มีข้อมูลรถครับ</p>';
            return;
        }

        // 4. แสดงผลรถยนต์
        cars.forEach(car => {
            const carCard = `
                <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <img src="${car.image_url || 'https://via.placeholder.com/400x250'}" class="w-full h-48 object-cover">
                    <div class="p-5">
                        <h3 class="text-xl font-bold">${car.brand} ${car.model} (${car.year})</h3>
                        <p class="text-blue-600 font-bold text-2xl mt-2">฿${Number(car.price).toLocaleString()}</p>
                        <p class="text-gray-500 text-sm mt-1">ไมล์: ${Number(car.mileage).toLocaleString()} กม.</p>
                    </div>
                </div>`;
            carListContainer.innerHTML += carCard;
        });

    } catch (err) {
        console.error("Error details:", err);
        carListContainer.innerHTML = `<p class="text-red-500 p-5 text-center">เกิดข้อผิดพลาด: ${err.message}</p>`;
    }
}

// เริ่มทำงาน
fetchCars();
