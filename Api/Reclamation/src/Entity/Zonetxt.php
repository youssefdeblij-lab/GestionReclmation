<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Zonetxt
 *
 * @ORM\Table(name="zonetxt")
 * @ORM\Entity
 */
class Zonetxt
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="zonetxt", type="string", length=50, nullable=false)
     */
    private $zonetxt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getZonetxt(): ?string
    {
        return $this->zonetxt;
    }

    public function setZonetxt(string $zonetxt): self
    {
        $this->zonetxt = $zonetxt;

        return $this;
    }


}
