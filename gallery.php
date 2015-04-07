<?php 
$directory = "images/proj/gallery/";
foreach(array_reverse(glob($directory."*", GLOB_ONLYDIR)) as $subdir) {
    $images = glob($subdir."/*.png");
    echo "<h3 class=\"text-info\">".basename($subdir)."</h3>";
    echo "<div class=\"gallery\">";
    foreach($images as $image)
    {
        list($width, $height) = getimagesize($image);
        echo "<figure>";
        echo "<a href=\"".$image."\" data-size=\"".$width."x".$height."\">";
        echo "<img src=\"".substr_replace($image,"_thumb.jpg",-4)."\">";
        echo "</a>";
        echo "<figcaption>".basename($image,".png")."</figcaption>";
        echo "</figure>";
    }
    echo "</div>";
}
?>
<!-- For SPARK : $images = glob($subdir."/*[!^thumb].jpg"); -->
