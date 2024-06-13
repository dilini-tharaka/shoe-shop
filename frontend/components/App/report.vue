<script setup>
const lineChart = {
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
      data: [65, 59, 80, 81, 56, 55, 40, 0, 0, 0, 0, 0],
      fill: false,
      borderColor: "rgb(50, 99, 207)",
      tension: 0.1,
    },
    {
      label: "Previous year",
      data: [10, 20, 70, 50, 67, 85, 90, 40, 70, 80, 70, 100],
      fill: false,
      borderColor: "rgb(0, 255, 0)",
      tension: 0.1,
    },
  ],
};

const barChart = {
  labels: ["Puma", "Nike", "Adidas", "Reebok", "Under Armour"],
  datasets: [
    {
      label: "Top 5 Brands",
      data: [65, 59, 80, 81, 56],
      backgroundColor: ["#3263cf"],
    },
  ],
};

const pieChart = {
  datasets: [
    {
      data: [10, 20, 30, 5],
      backgroundColor: ["#3263cf", "#7d4094", "#387a60", "#59c9b7"],
    },
  ],

  labels: ["Men", "Women", "Kids", "Sports"],
};

//Get Order count
const orderCount = ref(0);

onMounted(async () => {
  const { data: order } = await useFetch("http://localhost:8000/report/order");
  orderCount.value = order.value.data;
});

//Get Revenue
const revenue = ref(0);
onMounted(async () => {
  const { data: revenueData } = await useFetch(
    "http://localhost:8000/report/revenue"
  );
  revenue.value = parseFloat(revenueData.value.data).toFixed(2);
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
      <h1 class="text-blue-600 text-4xl">{{totalOrders}}</h1>
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
      <div class="flex flex-col w-1/2 h-full"></div>
    </div>
  </div>
</template>
