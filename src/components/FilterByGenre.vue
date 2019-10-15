<template>
  <div class="col-sm-12 px-0">
    <div class="card mt-2">
      <div class="card-body">
        <div class="form-inline">
          <label for="genre">Filter by genre:</label>
          <select class="form-control ml-3" id="genre" style="width:10%">
            <option selected>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterByGenre"
};
</script>

<style>
</style>