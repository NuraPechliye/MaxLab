function voltar() {
    document.getElementById("resultado").style.display = "none";
    document.getElementById("formMistura").style.display = "block";

    document.getElementsByName("reagente1")[0].selectedIndex = 0;
    document.getElementsByName("reagente2")[0].selectedIndex = 0;
}