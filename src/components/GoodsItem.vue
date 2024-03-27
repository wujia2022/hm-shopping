<template>
  <div v-if="item.goods_id" class="goods-item" @click="$router.push('/prodetail')">
    <div class="left">
      <img src="@/assets/product.jpg" alt="" />
    </div>
    <div class="right">
      <p class="tit text-ellipsis-2">
        {{item.name}}
      </p>
      <p class="count">已售{{item.sales}}件</p>
      <p class="price">
        <span class="new">¥{{item.goods_price_min}}</span>
        <span class="old">¥{{item.goods_price_max}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  height: 148px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 127px;
    img {
      display: block;
      width: 100%;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      color: #999;
      font-size: 12px;
    }
    .price {
      color: #999;
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>
