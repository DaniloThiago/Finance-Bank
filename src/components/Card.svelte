<script lang="ts">
  
</script>

<article>
</article>

<style type="text/scss" lang="scss">
  @import "./static/style.scss";
  article {
    position: relative;
    width: 32.6rem;
    height: 18.4rem;
    overflow: hidden;
    background: var(--c-jasmine-purple);
    background: var(--g-master);
    border-radius: 2rem;

    &:after,
    &:before {
      content: "";
      display: block;
      position: absolute;
      width: 33.2rem;
      height: 22.6rem;
      background-color: var(--c-black);
      opacity: 0.1;
      border-radius: 100%;
      z-index: 0;
    }

    &:after {
      top: -14.2rem;
      left: 13.5rem;
    }

    &:before {
      top: 10rem;
      left: -13.5rem;
    }
  }
</style>