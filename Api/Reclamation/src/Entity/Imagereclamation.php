<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Imagereclamation
 *
 * @ORM\Table(name="imagereclamation")
 * @ORM\Entity
 */
class Imagereclamation
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
     * @ORM\Column(name="lien", type="text", length=65535, nullable=false)
     */
    private $lien;

    /**
     * @var string
     *
     * @ORM\Column(name="typeimg", type="string", length=50, nullable=false)
     */
    private $typeimg;

    /**
     * @var int
     *
     * @ORM\Column(name="idreclamation", type="integer", nullable=false)
     */
    private $idreclamation;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLien(): ?string
    {
        return $this->lien;
    }

    public function setLien(string $lien): self
    {
        $this->lien = $lien;

        return $this;
    }

    public function getTypeimg(): ?string
    {
        return $this->typeimg;
    }

    public function setTypeimg(string $typeimg): self
    {
        $this->typeimg = $typeimg;

        return $this;
    }

    public function getIdreclamation(): ?int
    {
        return $this->idreclamation;
    }

    public function setIdreclamation(int $idreclamation): self
    {
        $this->idreclamation = $idreclamation;

        return $this;
    }


}
