<script lang="ts">
</script>
  
<div class="d-flex flex-col">
    <span class="h4">Pague com o Pix</span>
    <span class="texto-corrido-medio">Pague suas contas com praticidade ou gere códigos para realizar cobranças</span>
    <div class="d-flex flex-col">
        <button class="btn-primary">Pagar com pix</button>
        <button class="btn-secondary d-flex align-center justify-center">
            Gerar código
            <img src="./src/assets/icons/trending_flat.svg" alt="">
        </button>
    </div>
</div>


<style type="text/scss" lang="scss">
    @import "../../static/style.scss";

    div{
        background-color: var(--c-ebony-clay);
        gap: 42px;
        border-radius: 20px;
        padding: 32px;

        .h4{
            z-index: 1;
            color: var(--c-white);
            font-size: 24px;
            font-weight: 600;
            line-height: 120%;
        }

        .texto-corrido-medio{
            z-index: 1;
            color: #A6A6A6;
            font-size: 16px;
            font-weight: 500;
            line-height: 160%;
        }

        div{
            gap: 16px;
            padding: 0;

            .btn-primary{
                z-index: 1;
                border-radius: 10px;
                padding: 13.5px 10px;
                background-color: var(--c-purple-blue);

                color: var(--c-white);
                font-size: 14px;
                font-weight: 500;
                line-height: 120%;
            }

            .btn-secondary{
                z-index: 1;
                border-radius: 10px;
                padding: 13.5px 10px;
                border: 1px solid var(--c-white);
                background-color: transparent;
                gap: 16px;
                
                color: var(--c-white);
                font-size: 14px;
                font-weight: 500;
                line-height: 120%;
            }
        }

        &:after {
            content: "";
            display: block;
            position: absolute;
            z-index: 0;
            opacity: 0.04;
            background-image: url('../assets/logo/pix.svg');
            background-size: 250px;
            background-repeat: no-repeat;
            width: 250px;
            height: 250px;

            top: -2.2rem;
            right: -3.2rem;
        }
    }

</style>