<script setup>
const lineChart = ref({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "This year",
      data: [],
      fill: false,
      borderColor: "rgb(50, 99, 207)",
      tension: 0.1,
    },
    {
      label: "Previous year",
      data: [],
      fill: false,
      borderColor: "rgb(0, 255, 0)",
      tension: 0.1,
    },
  ],
});

//Get Monthly Sales by month
const { data: monthlySales } = await useFetch(
  "http://localhost:8000/report/monthly"
);

if (monthlySales.value.data && monthlySales.value.message === "Success") {
  lineChart.value.datasets[0].data = monthlySales.value.data.currentYear;
  lineChart.value.datasets[1].data = monthlySales.value.data.previousYear;
}

const barChart = ref({
  labels: [],
  datasets: [
    {
      label: "Top 5 Brands",
      data: [],
      backgroundColor: ["#3263cf"],
    },
  ],
});

try {
  const { data: topBrands } = await useFetch(
    "http://localhost:8000/report/topbrand"
  );
  console.log(topBrands.value.data);
  if (topBrands.value.data && topBrands.value.message === "Success") {
    barChart.value.labels = topBrands.value.data.map(
      (brand) => brand.brand_name
    );
    barChart.value.datasets[0].data = topBrands.value.data.map(
      (brand) => brand.total_sales
    );
  }
} catch (error) {
  console.log(error);
}

const pieChart = ref({
  datasets: [
    {
      data: [],
      backgroundColor: ["#3263cf", "#7d4094", "#387a60", "#59c9b7"],
    },
  ],

  labels: [],
});

//Get Shoe Sales by Category
try {
  const { data: shoeSales } = await useFetch(
    "http://localhost:8000/report/category"
  );
  if (shoeSales.value.data && shoeSales.value.message === "Success") {
    pieChart.value.labels = shoeSales.value.data.map(
      (category) => category.category_name
    );
    pieChart.value.datasets[0].data = shoeSales.value.data.map(
      (category) => category.total_sales
    );
  }
} catch (error) {
  console.log(error);
}
//Get Order count
const orderCount = ref(0);

onMounted(async () => {
  const { data: order } = await useFetch("http://localhost:8000/report/order");
  orderCount.value = order.value.data;
});

//Get Revenue for the last 7 days
const revenue = ref(0);
onMounted(async () => {
  const { data: revenueData } = await useFetch(
    "http://localhost:8000/report/revenue"
  );
  revenue.value = parseFloat(revenueData.value.data).toFixed(2);
});

//Get Revenue for the last 30 days
const revenue30 = ref(0);
onMounted(async () => {
  const { data: revenueData } = await useFetch(
    "http://localhost:8000/report/revenue30"
  );
  revenue30.value = parseFloat(revenueData.value.data).toFixed(2);
});

//Get Total Orders
const totalOrders = ref(0);
onMounted(async () => {
  const { data: totalOrdersData } = await useFetch(
    "http://localhost:8000/report/total"
  );
  totalOrders.value = totalOrdersData.value.data;
});
watch(() => {
  console.log(orderCount.value);
});

const products = ref([]);
//Get Top 5 Selling Products
const columns = [
  {
    key: "p_id",
    label: "P_ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "brand",
    label: "Brand",
  },
  {
    key: "selling_price",
    label: "Selling Price(LKR)",
  },
  {
    key: "quantity_sold",
    label: "Total Sales",
  },
];

onMounted(async () => {
  const { data: topProducts } = await useFetch(
    "http://localhost:8000/report/topshoe"
  );
  if (topProducts.value.data && topProducts.value.message === "Success") {
    products.value = topProducts.value.data;
  }
});
</script>
<template>
  <div class="w-full gap-5 flex flex-col">
    <div class="flex items-center p-3 gap-5">
      <div class="flex w-1/4 bg-slate-200 rounded">
        <div class="flex w-1/2 justify-center items-center">
          <h1 class="text-blue-600 text-4xl">{{ orderCount }}</h1>
        </div>
        <div class="w-1/2">
          <h1 class="uppercase text-lg font-mono">Orders</h1>
          <h1 class="font-bold">Last 7 days</h1>
        </div>
      </div>
      <div class="flex w-1/4 bg-slate-200 rounded">
        <div class="flex w-3/5 justify-center items-center">
          <h1 class="text-blue-600 text-xl">LKR {{ revenue }}</h1>
        </div>
        <div class="w-2/5">
          <h1 class="uppercase text-lg font-mono">Revenue</h1>
          <h1 class="font-bold">Last 7 days</h1>
        </div>
      </div>
      <div class="flex w-1/4 bg-slate-200 rounded">
        <div class="flex w-3/5 justify-center items-center">
          <h1 class="text-blue-600 text-xl">LKR {{ revenue30 }}</h1>
        </div>
        <div class="w-2/5">
          <h1 class="uppercase text-lg font-mono">Revenue</h1>
          <h1 class="font-bold">Last 30 days</h1>
        </div>
      </div>
      <div class="flex w-1/4 bg-slate-200 rounded">
        <div class="flex w-3/5 justify-center items-center">
          <h1 class="text-blue-600 text-4xl">{{ totalOrders }}</h1>
        </div>
        <div class="w-2/5 flex flex-col">
          <span class="uppercase text-lg font-mono">Total </span>
          <span class="uppercase text-lg font-mono">Orders</span>
        </div>
      </div>
    </div>
    <div class="flex w-full items-center p-3 h-96 gap-5">
      <div class="flex flex-col w-1/2 h-full">
        <h1 class="text-lg font-mono">Monthly Selling Rate</h1>
        <AppChart
          type="line"
          id="myChart"
          :data="lineChart"
          class="w-full h-full"
        />
      </div>
      <div class="flex flex-col w-1/2 h-full">
        <h1 class="text-lg font-mono">Top 5 Brands of the Month</h1>
        <AppChart
          type="bar"
          id="myBar"
          :data="barChart"
          class="w-full h-full"
        />
      </div>
    </div>
    <div class="flex w-full items-center p-3 h-96 gap-5">
      <div class="flex flex-col w-1/2 h-full">
        <h1 class="text-lg font-mono">
          Shoe Sales Last 30 days - Category Wise
        </h1>
        <AppChart
          type="doughnut"
          id="myPie"
          :data="pieChart"
          class="w-full h-full"
        />
      </div>
      <div class="flex flex-col w-1/2 h-full">
        <h1 class="text-lg font-mono">Top 5 Selling Products of the Month</h1>
        <UTable :columns="columns" :rows="products"></UTable>
      </div>
    </div>
  </div>
</template>
