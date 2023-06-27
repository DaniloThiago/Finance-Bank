<script lang="ts">
    import SelectCard from "./SelectCard.svelte";

</script>
  
<div class="d-flex flex-col pix-card">
    <span class="h4">Meu Cartão</span>
    <div class="d-flex flex-col limite">
        <span class="texto-corrido-medio">Limite do Cartão</span>
        <span class="h4">$15,595.015</span>
    </div>
    <SelectCard quantidadeExibida={1} />
    <div class="d-flex">
        <button class="btn-primary w-100">Gerenciar Cartões</button>
        <button class="btn-secondary w-100"> Pagar </button>
    </div>
</div>


<style type="text/scss" lang="scss">
    @import "../../static/style.scss";

    .pix-card{
        background-color: var(--c-ebony-clay);
        gap: 2.4rem;
        border-radius: 2rem;
        padding: 3.2rem;
        position: relative;
        overflow: hidden;

        .limite{
            gap: 4px;
        }

        .h4{
            z-index: 1;
            color: var(--c-white);
            font-size: 2.4rem;
            font-weight: 600;
            line-height: 120%;
        }

        .texto-corrido-medio{
            z-index: 1;
            color: #A6A6A6;
            font-size: 1.6rem;
            font-weight: 500;
            line-height: 160%;
        }

        div{
            gap: 1.6rem;
            padding: 0;

            .btn-primary{
                z-index: 1;
                border-radius: 1rem;
                border: none;
                padding: 1.35rem 1rem;
                background-color: var(--c-purple-blue);

                color: var(--c-white);
                font-size: 1.4rem;
                font-weight: 500;
                line-height: 120%;
            }

            .btn-secondary{
                z-index: 1;
                border-radius: 1rem;
                padding: 1.35rem 1rem;
                border: 1px solid var(--c-white);
                background-color: transparent;
                gap: 1.6rem;
                
                color: var(--c-white);
                font-size: 1.4rem;
                font-weight: 500;
                line-height: 120%;
            }
        }
    }

</style>